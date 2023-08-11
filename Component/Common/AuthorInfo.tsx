import { FC } from "react";
import Image from "next/image";

export interface AuthorProfile {
  id: string;
  name: string;
  avatar: string;
  message: string;
}
interface AuthorInfoProps {
  profile: AuthorProfile;
}

const AuthorInfo: FC<AuthorInfoProps> = ({ profile }): JSX.Element => {
  return (
    <div className="p-2 border-2 border-secondary-dark rounded flex ">
      <div className="m-12">
        <div className="aspect-square relative">
          <Image
            src={profile.avatar}
            layout="fill"
            alt={profile.name}
            className="rounded"
          />
        </div>
        <div className="ml-2 flex-1">
          <h4 className="font-semibold text-primary-dark dark:text-primary">
            {profile.name}
          </h4>
          <p className="text-primary-dark dark:text-primary opacity-90">
            {profile.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
