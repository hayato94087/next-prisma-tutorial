import { type FC } from "react";
import { getUsersDTO } from "@/server/user-dto";

export const revalidate = 10; // 10秒ごとに再検証

const Home: FC = async () => {
  const users = await getUsersDTO();

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Hello World</h1>
          <br />
          {users.map((user) => (
            <div key={user.id} className="text-gray-500 text-sm">
              {user.name},{user.email}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
