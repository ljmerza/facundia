
export interface IterationInterface {
  id: number;
  name: string;
  comments: IterationCommentInterface[];
  created_at: string;
  end_date: string;
  start_date: string;
  updated_at: string;
  entity_type: string;
  follower_ids: string[];
  labels: IterationLabelInterface[];
  mention_ids: string[];
  status: string;
  stats: IterationLabelStatInterface;
}

interface IterationLabelInterface {
  archived: boolean;
  color: string;
  created_at: string;
  entity_type: string;
  external_id: string;
  id: number;
  name: string;
  stats: IterationLabelStatInterface,
}

interface IterationLabelStatInterface {
  num_epics: number;
  num_points_completed: number;
  num_points_in_progress: number;
  num_points_total: number;
  num_stories_completed: number;
  num_stories_in_progress: number;
  num_stories_total: number;
  num_stories_unestimated: number;
}

interface IterationCommentInterface {
  author_id: string;
  comments: IterationCommentInterface;
  created_at: string;
  deleted: boolean;
  entity_type: string;
  external_id: string;
  id: number;
  mention_ids: string[];
  text: string;
  updated_at: string;
}

