"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export async function addToWatchLists(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const movieId = formData.get("movieId");
  const pathName = formData.get("pathName") as string;
  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });
  revalidatePath(pathName);
}

export async function deleteFromWatchLists(formData: FormData) {
  "use server";
  const watchlistId = formData.get("watchlistId") as string;
  const pathName = formData.get("pathName") as string;
  const data = await prisma.watchList.delete({
    where: {
      id: watchlistId,
    },
  });
  revalidatePath(pathName);
}
