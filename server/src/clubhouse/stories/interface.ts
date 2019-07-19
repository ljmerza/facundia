export interface StoryInterface {
    app_url: string;
    archived: boolean;
    blocked: boolean;
    blocker: boolean;
    comment_ids?: (number)[] | null;
    completed: boolean;
    completed_at: string;
    completed_at_override: string;
    created_at: string;
    deadline: string;
    entity_type: string;
    epic_id: number;
    estimate: number;
    external_id: string;
    file_ids?: (number)[] | null;
    follower_ids?: (string)[] | null;
    id: number;
    labels?: (StoryLabelsEntityInterface)[] | null;
    linked_file_ids?: (number)[] | null;
    mention_ids?: (string)[] | null;
    moved_at: string;
    name: string;
    owner_ids?: (string)[] | null;
    position: number;
    project_id: number;
    requested_by_id: string;
    started: boolean;
    started_at: string;
    started_at_override: string;
    story_links?: (StoryLinksEntityInterface)[] | null;
    story_type: string;
    task_ids?: (number)[] | null;
    updated_at: string;
    workflow_state_id: number;
}

export interface StoryLabelsEntityInterface {
    archived: boolean;
    color: string;
    created_at: string;
    entity_type: string;
    external_id: string;
    id: number;
    name: string;
    stats: StoryStatsInterface;
    updated_at: string;
}

export interface StoryStatsInterface {
    num_epics: number;
    num_points_completed: number;
    num_points_in_progress: number;
    num_points_total: number;
    num_stories_completed: number;
    num_stories_in_progress: number;
    num_stories_total: number;
    num_stories_unestimated: number;
}

export interface StoryLinksEntityInterface {
    created_at: string;
    entity_type: string;
    id: number;
    object_id: number;
    subject_id: number;
    type: string;
    updated_at: string;
    verb: string;
}