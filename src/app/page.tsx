import { type FC } from "react";
import { db } from "@/server/db";

const Home: FC = async () => {
  const users = await db.user.findMany();

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
