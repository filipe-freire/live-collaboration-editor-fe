import { Users } from "lucide-react";

export interface User {
  name: string;
  color: string;
}

export const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="flex items-center gap-2">
      <Users className="h-5 w-5 text-gray-600" />
      <div className="flex -space-x-2">
        {users.map((user, i) => (
          <div
            key={user.name}
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold"
            style={{
              backgroundColor: user.color,
              color: "#fff",
              zIndex: users.length - i,
            }}
            title={user.name}
          >
            {user.name[0].toUpperCase()}
          </div>
        ))}
      </div>

      <span className="text-sm text-gray-600">
        {users.length} user{users.length !== 1 ? "s" : ""} online
      </span>
    </div>
  );
};
