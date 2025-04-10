import prisma from "@/lib/db";
class UserService {
  async getUser(id: string) {
    return await prisma.user.findFirst({
      where: { id },
    });
  }

  async updateProfileImage(id: string | undefined, image: string) {
    return await prisma.user.update({
      where: { id },
      data: { image },
    });
  }

  async updateNameAndBio(id: string, name: string, bio: string) {
    return await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
      },
    });
  }

  async getUserId(id: string) {
    return await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
export const userService = new UserService();
