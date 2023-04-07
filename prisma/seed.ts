import { PrismaClient, UserRole } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function seed() {
  const passwordUser = await argon2.hash('Password!');

  let user: any = {
    email: 'test@website.com',
    passwordHash: passwordUser,
    role: UserRole.User,
  }

  user = await prisma.user.upsert({
    where: {
      email: user.email
    },
    create: user,
    update: user
  });

  const passwordClub = await argon2.hash('Password!');

  let userClub: any = {
    email: 'club@website.com',
    passwordHash: passwordClub,
    role: UserRole.ClubOwner
  }

  userClub = await prisma.user.upsert({
    where: {
      email: userClub.email
    },
    create: userClub,
    update: userClub
  });

  const passwordAdmin = await argon2.hash('Password!');

  let userAdmin: any = {
    email: 'admin@website.com',
    passwordHash: passwordAdmin,
    role: UserRole.Admin
  }

  userAdmin = await prisma.user.upsert({
    where: {
      email: userAdmin.email
    },
    create: userAdmin,
    update: userAdmin
  })
}
