
export interface LabelInterface {
	entity_type: string;
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
	color: string;
	external_id: number;
	archived: false;
	stats: LabelStatsInterface[];
}

export interface LabelStatsInterface {
	num_stories_total: number,
	num_stories_in_progress: number,
	num_stories_completed: number,
	num_stories_unestimated: number,
	num_points_total: number,
	num_points_in_progress: number,
	num_points_completed: number,
	num_epics: number,
}