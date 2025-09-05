import {
    UserCardWrapper,
    UserImage,
    UserInfo,
    UserName,
    UserMeta,
    UserActions,
} from '../../styles/admin/UsersStyles';
import { type User } from '../../types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
    user: User;
    onDelete: () => void;
    onEdit: () => void;
}

export const UserCard = ({ user, onDelete, onEdit }: Props) => {
    return (
        <UserCardWrapper>
            <UserImage src={user.imageUrl || '/default-user.png'} alt={user.username} />

            <UserInfo>
                <UserName>@{user.username}</UserName>
                <UserMeta>{user.email}</UserMeta>
                <UserMeta>{user.role}</UserMeta>
            </UserInfo>

            <UserActions>
                <button onClick={onEdit} title="Editar">
                    <FaEdit />
                </button>
                <button onClick={onDelete} title="Eliminar">
                    <FaTrash />
                </button>
            </UserActions>
        </UserCardWrapper>
    );
};
