

export interface ProjectInterface {
    abbreviation: string,
    archived: true,
    color: string,
    created_at: string,
    days_to_thermometer: number,
    description: string,
    entity_type: string,
    external_id: string,
    follower_ids: string[],
    id: number,
    iteration_length: number,
    name: string,
    show_thermometer: true,
    start_time: string,
    stats: ProjectStats,
    team_id: number,
    updated_at: string
}

export interface ProjectStats {
    num_points: number,
    num_stories: number
}