
export interface LoggerInterface {
	
}

export interface LogTimeBodyInterface {
    billable: boolean;
    created_with: string;
    description: string;
    duration: number;
    pid: number;
    start: string;
    stop: string;
    tags: TagInterface[];
    tid: any
    wid: number;
}


interface TagInterface {

}