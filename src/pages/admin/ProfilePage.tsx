import { useState } from 'react';
import { ViewProfileSection } from '../../sections/admin/ViewProfileSection';
import { EditProfileSection } from '../../sections/admin/EditProfileSection';

export const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <EditProfileSection onCancel={() => setIsEditing(false)} />
            ) : (
                <ViewProfileSection onEdit={() => setIsEditing(true)} />
            )}
        </>
    );
};