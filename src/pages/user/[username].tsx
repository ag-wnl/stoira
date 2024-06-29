import { useSession } from "next-auth/react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ProfileSkeletonLoader } from "~/components/Loader";
import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Text,
  CardHeader,
  Flex,
  Heading,
  Box,
} from "@chakra-ui/react";
import PixelSky from "../../imgs/pixel_sky.png";
import vanGoh from "../../imgs/banner.jpg";
import Image from "next/image";
import Avatar from "~/components/Avatar";
import EditProfile from "~/components/EditProfile";
import CustomButton from "~/components/CustomButton";
import { useState } from "react";
import Link from "next/link";
import { urlFormatter } from "~/components/utils/urlFormatter";
import { type Prisma } from "@prisma/client";

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

export default function Profile() {
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

      <div className="mt-10 flex flex-col  gap-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-[3rem]">
            Profile
          </h1>
        </div>

        {isLoading && !isError ? (
          <ProfileSkeletonLoader />
        ) : isError ? (
          <div className="flex flex-col items-center gap-10">
            <Alert status="error">
              <AlertIcon />
              No user with the username exists
            </Alert>

            <Image
              width={"300"}
              src={PixelSky}
              alt={"Profile Image"}
              quality={100}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <Card variant={"outline"}>
              <CardHeader padding={0} position="relative" height={200}>
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgImage={`url(${vanGoh.src})`}
                  bgSize="cover"
                  bgPosition="center"
                  borderTopLeftRadius="md"
                  borderTopRightRadius="md"
                />
                <Flex
                  position="relative"
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  padding="4"
                  zIndex={1}
                  color="white" // Adjust text color for better contrast
                >
                  <Avatar src={userData?.image} />

                  <Box>
                    <Heading size="sm">{userData?.name}</Heading>
                    <Text>{userData?.realName}</Text>
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{userData?.about}</Text>
                {userData?.website && (
                  <Link
                    href={urlFormatter(userData.website as string)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {userData.website}
                  </Link>
                )}
              </CardBody>
            </Card>

            <Link
            // href={session ? "/api/auth/signout" : "/api/auth/signin"}
            href={ "/api/auth/signout"}
            className="font-medium text-gray-200 hover:text-[hsl(262,100%,75%)] px-4 py-3 flex items-center transition duration-150 ease-in-out"
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
        )}
      </div>
    </PageWrapper>
  );
}
