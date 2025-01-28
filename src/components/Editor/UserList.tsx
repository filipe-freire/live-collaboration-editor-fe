import { Editor } from "@tiptap/react";
import { Users } from "lucide-react";

export interface User {
  clientId: number;
  name: string;
  color: string;
}

interface IUserListProps {
  editor: Editor;
}

export const UserList = ({ editor }: IUserListProps) => {
  const userList: User[] = (
    editor.storage.collaborationCursor as { users: User[] }
  ).users.filter((u) => u.name && u.color);

  return (
    <div className="flex items-center gap-2">
      <Users className="h-5 w-5 text-gray-600" />
      <div className="flex -space-x-2">
        {userList.map((user, i) => (
          <div
            key={user.name}
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
            style={{
              backgroundColor: user.color,
              zIndex: userList.length - i,
            }}
            title={user.name}
          >
            {user.name[0].toUpperCase()}
          </div>
        ))}
      </div>

      <span className="text-sm text-gray-600">
        {userList.length} user{userList.length !== 1 ? "s" : ""} online
      </span>
    </div>
  );
};
