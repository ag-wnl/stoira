import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import EditProfile from "~/components/EditProfile";
import CustomButton from "~/components/CustomButton";
import { useState } from "react";
import Link from "next/link";
import { type Prisma } from "@prisma/client";
import PageWrapper from "~/components/PageWrapper";
import Header from "~/components/Header";

export type UserDataType = {
  userData:
    | {
        id: string;
        name: string | null;
        realName: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        about: string | null;
        website: string | null;
        metadata: Prisma.JsonValue;
      }
    | undefined;
};

export default function Start() {
  const session = useSession();
  const router = useRouter();
  const { username } = router.query;

  const [editProfile, setEditProfile] = useState<boolean>(false);

  const validUsername = typeof username === "string" ? username : null;

  const {
    data: userData,
    isLoading,
    isError,
  } = api.user.getUser.useQuery(
    { name: validUsername ?? "" },
    { enabled: !!validUsername }, // Disable the query if username is null
  );

  return (
    <PageWrapper>
      <div>
        <Header />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-[3rem]">
            Profile
          </h1>
          <span>Setup your account</span>
        </div>

        <div className="flex flex-col gap-5">
          <Link
            // href={session ? "/api/auth/signout" : "/api/auth/signin"}
            href={"/api/auth/signout"}
            className="flex items-center px-4 py-3 font-medium text-gray-200 transition duration-150 ease-in-out hover:text-[hsl(262,100%,75%)]"
          >
            <CustomButton>Signout</CustomButton>
          </Link>

          <div>
            <CustomButton
              className="justify-start"
              small={true}
              gray={true}
              onClick={(e) => setEditProfile(!editProfile)}
            >
              Edit
            </CustomButton>
          </div>
          {editProfile && <EditProfile userData={userData} />}
        </div>
      </div>
    </PageWrapper>
  );
}
