

export interface MemberInterface {
    entity_type: string,
    id: number,
    created_at: string,
    updated_at: string,
    role: string,
    disabled: boolean,
    profile: ProfileInterface,
}

interface ProfileInterface {
    entity_type: string,
    deactivated: boolean,
    two_factor_auth_activated: boolean,
    mention_name: string,
    name: string,
    gravatar_hash: string,
    id: string,
    display_icon: DisplayIconInterface,
    email_address: string,
}

interface DisplayIconInterface {
    entity_type: string,
    id: string,
    created_at: string,
    updated_at: string,
    url: string,
}