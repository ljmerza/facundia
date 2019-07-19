
export interface WorkflowInterface {
    entity_type: string,
    id: number,
    created_at: string,
    updated_at: string,
    name: string,
    description: string,
    team_id: number,
    default_state_id: number,
    states: WorkflowStateInterface[],
}

export interface WorkflowStateInterface {
  description: string;
  entity_type: string;
  color: string;
  verb: string;
  name: string;
  num_stories: number;
  type: string;
  updated_at: string;
  id: number;
  position: number;
  created_at: string;
}