import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/admin/useAuthStore';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import {
    ProfileCard,
    AvatarLarge,
    ProfileName,
    ProfileRole,
    InfoGrid,
    InfoItem,
    ButtonGroup,
    SubmitButton
} from '../../styles/admin/ProfileStyles';
import { GhostBtn } from '../../styles/admin/ItemsFormStyles'; // Reusing your existing Ghost Button

interface Props {
    onEdit: () => void;
}

export const ViewProfileSection = ({ onEdit }: Props) => {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Mi Perfil</h1>
                    <p>Información de tu cuenta</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <ProfileCard>
                    <AvatarLarge 
                        src={user.imageUrl || 'https://via.placeholder.com/150'} 
                        alt={user.name} 
                    />
                    
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
                        <ProfileName>{user.name}</ProfileName>
                        <ProfileRole>{user.role}</ProfileRole>
                    </div>

                    <InfoGrid>
                        <InfoItem>
                            <strong>Usuario</strong>
                            <span>@{user.username}</span>
                        </InfoItem>
                        <InfoItem>
                            <strong>Email</strong>
                            <span>{user.email}</span>
                        </InfoItem>
                        {user.bio && (
                            <InfoItem>
                                <strong>Biografía</strong>
                                <span>{user.bio}</span>
                            </InfoItem>
                        )}
                    </InfoGrid>

                    <ButtonGroup>
                        <GhostBtn as={Link} to="/admin">
                            Volver al Dashboard
                        </GhostBtn>
                        <SubmitButton onClick={onEdit}>
                            Editar Perfil
                        </SubmitButton>
                    </ButtonGroup>
                </ProfileCard>
            </SectionBody>
        </AdminLayout>
    );
};