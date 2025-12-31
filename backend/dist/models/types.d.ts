export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: 'donor' | 'ngo' | 'admin';
    contact_info?: string;
    address?: string;
    verified?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export interface Donation {
    id?: number;
    ngo_id: number;
    donation_type: 'food' | 'funds' | 'clothes' | 'books' | 'toys' | 'medical' | 'other';
    title: string;
    description?: string;
    quantity_or_amount: string;
    location: string;
    pickup_date_time: Date;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    images?: string;
    priority?: 'normal' | 'urgent' | 'critical';
    created_at?: Date;
    updated_at?: Date;
}
export interface Contribution {
    id?: number;
    donation_id: number;
    donor_id: number;
    quantity_or_amount: string;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    pickup_scheduled?: Date;
    notes?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface Pickup {
    id?: number;
    contribution_id: number;
    pickup_date: Date;
    pickup_address: string;
    contact_person?: string;
    contact_phone?: string;
    status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    notes?: string;
    created_at?: Date;
    updated_at?: Date;
}
//# sourceMappingURL=types.d.ts.map