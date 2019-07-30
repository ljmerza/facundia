import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ROUTE_ANIMATIONS_ELEMENTS, selectChUsername } from '../../../../core';

import { StandUpState } from '../../models';
import { actionClubhouseGetStandUp } from '../../actions';
import { selectStandUp } from '../../selectors';


@Component({
    selector: 'kp-ch-stand-up',
    templateUrl: './stand-up.component.html',
    styleUrls: ['./stand-up.component.scss']
})
export class StandUpComponent implements OnInit, OnDestroy {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    standUp$: Subscription;
    username$: Subscription;
    loading: boolean = false;

    standUp;
    standUpText: string;
    yesterday;

    constructor(public store: Store<any>, private router: Router) { }


    ngOnInit() {
        this.username$ = this.store.pipe(select(selectChUsername))
            .subscribe(chUsername => {
                // if no username then go to login page else get stand up data
                if (!chUsername) {
                    this.router.navigate(['/clubhouse/login']);
                    return;
                }
                
                this.loading = true;
                this.standUp$ = this.store.pipe(select(selectStandUp)).subscribe(this.processStandUpData.bind(this));
                this.store.dispatch(actionClubhouseGetStandUp({ username: chUsername }));
            });
    }

    ngOnDestroy(){
        if (this.standUp$) this.standUp$.unsubscribe();
        if (this.username$) this.username$.unsubscribe();
    }

    private processStandUpData(standUp) {
        if (standUp.loading || !standUp.data) return;
        
        // add internal props such as checked and filter out API/archived based cards
        let inDevCards = standUp.data.mergedProjects.myStoriesInDev
            .map(this.addCardInternalProps)
            .filter(this.filterUnneededCards);
        let readyForDevCards = standUp.data.mergedProjects.readyForDev
            .map(this.addCardInternalProps)
            .filter(this.filterUnneededCards);

        // get yesterday's date to sort last modded stories
        // if yeterday was sunday then 'yesterday' is actually friday
        let yesterday = moment().subtract(1, 'days').startOf('day');
        if (yesterday.day() === 0){
            yesterday = yesterday.subtract(2, 'days');
        }

        // sort stories by last updated by yesterday and the rest
        let yesterdayWork = [];
        let restOfWork = [];
        standUp.data.mergedProjects.myStories
            .map(this.addCardInternalProps)
            .forEach(story => {
            
                // seperate my work by yesterday's work and everything else
                const storyDate = moment(new Date(story.updated_at));
                if(storyDate.isAfter(yesterday)){
                    yesterdayWork.push(story);
                } else {
                    restOfWork.push(story);
                }
            });


        // sort by last updated
        yesterdayWork.sort(this.sortByUpdatedDate);
        restOfWork.sort(this.sortByUpdatedDate);
        inDevCards.sort(this.sortByUpdatedDate);
        readyForDevCards.sort(this.sortByUpdatedDate);
        
        // update UI
        this.standUp = { yesterdayWork, restOfWork, inDevCards, readyForDevCards };
        this.yesterday = yesterday;
        this.loading = standUp.loading;
    }

    /**
     * filter out API/archived based card
     * @param card 
     */
    private filterUnneededCards(card){
        return card.projectName !== 'API' && !card.archived;
    }

    /**
     * adds internal props for a card such as 'checked'
     * @param card
     */
    private addCardInternalProps(card) {
        card._internal = {
            yesterdayChecked: false,
            todayChecked: false,
            blockChecked: false,
        };

        return card;
    }

    private sortByUpdatedDate(a, b) {
        a = new Date(a.updated_at);
        b = new Date(b.updated_at);
        return a > b ? -1 : a < b ? 1 : 0;
    }

    /**
     * toggle a card's checked prop
     * @param {string} event the click event
     * @param {string} card the card object itself
     */
    public toggleCard({target:{name}}, card){
        card._internal[name] = !card._internal[name];
        this.updateStandUpList();
    }

    private updateStandUpList(){
        const yesterdayWork = [];
        const todayWork = [];
        const blockedWork = [];

        // for each list, filter checked cards into their respective array above
        this.standUp.yesterdayWork.forEach(card => this.filterCard(card, yesterdayWork, todayWork, blockedWork));
        this.standUp.restOfWork.forEach(card => this.filterCard(card, yesterdayWork, todayWork, blockedWork));
        this.standUp.inDevCards.forEach(card => this.filterCard(card, yesterdayWork, todayWork, blockedWork));
        this.standUp.readyForDevCards.forEach(card => this.filterCard(card, yesterdayWork, todayWork, blockedWork));

        // build yesterday's list
        let standUpText = '\nYesterday:\n';
        const yesterdayWorkText = yesterdayWork.map(this.cardTextLine.bind(this)).join('\n');
        if (yesterdayWorkText){
            standUpText += `${yesterdayWorkText}\n`;
        } else {
            standUpText += `- none\n`;
        }
        
        // build today's list
        standUpText += '\nToday:\n';
        const todayWorkText = todayWork.map(this.cardTextLine.bind(this)).join('\n');
        if (todayWorkText) {
            standUpText += `${todayWorkText}\n`;
        } else {
            standUpText += `- none\n`;
        }

        // build blocked list
        standUpText += '\nBlocked:\n';
        const blockedWorkText = blockedWork.map(this.cardTextLine.bind(this)).join('\n');
        if (blockedWorkText) {
            standUpText += `${blockedWorkText}\n`;
        } else {
            standUpText += `- none\n`;
        }

        this.standUpText = standUpText
    }

    private filterCard(card, yesterdayWork, todayWork, blockedWork){

        // if card is checked and not already in array
        if (card._internal.yesterdayChecked && !yesterdayWork.find(o => o.id === card.id)){
            yesterdayWork.push(card);
        } 

        // check for today's list
        if (card._internal.todayChecked && !todayWork.find(o => o.id === card.id)) {
            todayWork.push(card);
        }

        // check for blocked list
        if (card._internal.blockChecked && !blockedWork.find(o => o.id === card.id)) {
            blockedWork.push(card);
        }
    }

    /**
     * makes a card's list on the text area
     * @param card 
     * @return {string}
     */
    private cardTextLine(card) {
        return `- [${card.epic_id}] ${card.name}`;
    }

    public copyStandUp(){
        this.copyText(this.standUpText);
    }

    private copyText(text){
        if (!text) return;

        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}