import Userisland from "../../islands/User.tsx";

export type UserType = {
    userid:string,
    name:string,
    email:string,
    coins:string
}

export default function Profile() {
  return (
    <div>
      <Userisland />
    </div>
  );
}