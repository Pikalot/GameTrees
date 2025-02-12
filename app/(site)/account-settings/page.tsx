import { getServerSession } from "next-auth/next";
import { authOptions } from "@/nextauth/NextAuthOptions";
import Avatar from "@/app/ui/components/auth/Avatar";
import AccountSettingsPageWrapper from "./AccountSettingsWrapper";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";
import { getUser } from "@/database/queries/user/getUser";

export default async function AccountSettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return (
            <p className="text-center text-error text-xl">
                You need to be logged in to access account settings.
            </p>
        );
    }

    // Fetch the profile image from the database
    const thisUser = await getUser(session.user.id);

    // Format the DOB
    const formattedDOB = thisUser?.dob ? new Date(thisUser.dob).toLocaleDateString() : "N/A";

    return (
        <div className="pb-[5rem] min-h-screen">
            <div className="flex justify-center">
                <div className="w-[90%] max-w-4xl bg-gradient-to-b from-gray-300 to-[#afb3be] dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-lg p-8 select-none">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Account Settings
                    </h1>

                    {/* Profile Avatar */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
                        {/* Avatar */}
                        <Avatar
                            image={thisUser?.image || undefined}
                            username={thisUser?.username}
                            className="ring-4 ring-primary ring-offset-4 ring-offset-gray-300 dark:ring-offset-base-100"
                            size="8rem"
                            textSize="text-2xl"
                        />

                        {/* User Info */}
                        <div className="flex-grow w-full">
                            <p className="w-full text-xl font-semibold mb-2 text-gray-900 dark:text-white">{thisUser?.firstname} {thisUser?.lastname}</p>
                            <p className="text-sm text-gray-800 dark:text-gray-300">
                                <span className="font-semibold text-base">Username:</span> {thisUser?.username || "ERROR: NO USERNAME"}
                            </p>
                            <p className="text-sm text-gray-800 dark:text-gray-300">
                                <span className="font-semibold text-base">Email:</span> {thisUser?.email || "!!!CRITICAL ERROR: NO EMAIL"}
                            </p>
                            <p className="w-full text-sm text-gray-800 dark:text-gray-300">
                                <span className="font-semibold text-base">Mobile Phone Number:</span> {thisUser?.phone || "N/A"}
                            </p>
                            <p className="w-full text-sm text-gray-800 dark:text-gray-300">
                                <span className="font-semibold text-base">DOB:</span> {formattedDOB || "ERROR: NO DOB"}
                            </p>
                            <p className="w-full text-sm text-gray-800 dark:text-gray-300">
                                <span className="font-semibold text-base">UID:</span> {thisUser?.uid || "!!!CRITICAL ERROR: NO UID"}
                            </p>
                            <SignOutButton className="mt-5 px-3 py-2 w-full" />
                        </div>
                    </div>
                    {/* Client Component for Upload */}
                    <div className="mt-8">
                        <AccountSettingsPageWrapper />
                    </div>
                </div>
            </div>
        </div>
    );
}
