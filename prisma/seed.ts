import { PrismaClient, UserRole, Club, User } from '@prisma/client';
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
  });

  const clubs = [
    {
      name: 'Rotary',
      link: 'https://www.rotary.org/en',
      description: '',
      phone: "888-888-8887",
      type: "Social Service",
      address: {
        connectOrCreate: {
          where: {
            street: '2000 Somewhere St.'
          },
          create: {
            street: '2000 Somewhere St.',
            city: "Miami",
            state: "Florida",
            zipcode: "33172"
          }
        }
      },
      email: "contact@rotary.com"
    },
    {
      name: 'Peta',
      link: 'https://www.peta.org/',
      description: '',
      type: "Social Service",
      phone: "888-888-8888",
      address: {
        connectOrCreate: {
          where: {
            street: '1000 Zapata Ave.'
          },
          create: {
            street: '1000 Zapata Ave.',
            city: "Miami",
            state: "Florida",
            zipcode: "33375"
          }
        }
      },
      email: "contact@peta.com"
    },
    {
      name: 'ACM',
      link: 'https://www.acm.org/',
      description: '',
      type: "Social Service",
      phone: "888-888-8889",
      address: {
        connectOrCreate: {
          where: {
            street: '800 Main Hwy'
          },
          create: {
            street: '800 Main Hwy',
            city: "Miami",
            state: "Florida",
            zipcode: "33987"
          }
        }
      },
      email: "contact@acm.com"
    }
  ];

  for(const club of clubs) {
    await prisma.club.upsert({
      where: {
        name: club.name
      },
      create: club,
      update: club
    });
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect())