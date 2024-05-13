import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'renan@alves.id',
        name: 'Renan Alves',
        avatar: '/api/mockCloud/avatar.jpg',
      },
      {
        email: 'user2@example.com',
        name: 'User Two',
        avatar: '/api/mockCloud/avatarXYZ.jpg',
      },
    ],
  })

  await prisma.place.createMany({
    data: [
      {
        name: 'Bethel Woods Serenity: Your Autumn Escape',
        shortDesc: 'The Hemlock House at Bethel Woods: Stunning A-Frame 5 Mins From Bethel Woods Center',
        description: `Welcome to The Hemlock House at Bethel Woods – a gorgeous modern home surrounded by woodlands of Eastern pine and hemlock trees. In 1969 Bethel Woods was home to the notorious Woodstock festival. Located in the country hills of the Sullivan Catskills, Bethel Woods is an amazing place to explore, hike, and listen to live music. Just 5 minutes away from Bethel Woods Center of the Arts, you will find a stunning A-Frame home waiting to host your next adventure.`,
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        price: 350,
      },
      {
        name: 'Fawn Hill Cabin: Cozy Log Cabin in Phoenicia',
        shortDesc: 'Fawn Hill Cabin: Cozy Log Cabin in Phoenicia',
        description: `Fawn Hill Cabin is a one-of-a-kind log cabin experience in Phoenicia, in the heart of the Catskill Mountains. Newly renovated from top to bottom! Enjoy your own heated Mod pool, hot tub and outdoor shower overlooking breathtaking mountain and Woodland Valley views.`,
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        price: 780,
      },
      {
        name: 'A Retreat @ Hudson Woods: Luxury Property w/ Two Houses LUXE',
        shortDesc: 'A Retreat @ Hudson Woods: Luxury Property w/ Two Houses',
        description: `A Retreat @ Hudson Woods is a luxury oasis nestled in the private woods of Kerhonkson. Nearby breweries, farms, and fine dining restaurants make Kerhonkson is true destination, but the privacy and relaxing nature of A Retreat is a peaceful draw as well. Located on 8 acres of land in the Hudson Woods development, A Retreat was recently featured in Architectural Digest. There’s also a brand new custom built cedar hot tub near the pool house!`,
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        price: 535,
      },
    ],
  })

  await prisma.image.createMany({
    data: [
      { url: '/api/mockCloud/1.jpg', placeId: 1 },
      { url: '/api/mockCloud/2.jpg', placeId: 1 },
      { url: '/api/mockCloud/3.jpg', placeId: 1 },
      { url: '/api/mockCloud/4.jpg', placeId: 1 },
      { url: '/api/mockCloud/5.jpg', placeId: 1 },
      { url: '/api/mockCloud/6.jpg', placeId: 2 },
      { url: '/api/mockCloud/7.jpg', placeId: 2 },
      { url: '/api/mockCloud/8.jpg', placeId: 2 },
      { url: '/api/mockCloud/9.jpg', placeId: 2 },
      { url: '/api/mockCloud/10.jpg', placeId: 2 },
      { url: '/api/mockCloud/11.jpg', placeId: 3 },
      { url: '/api/mockCloud/12.jpg', placeId: 3 },
      { url: '/api/mockCloud/13.jpg', placeId: 3 },
      { url: '/api/mockCloud/14.jpg', placeId: 3 },
      { url: '/api/mockCloud/15.jpg', placeId: 3 },
    ],
  })

  for (let i = 0; i < 10; i++) {
    const bookingDate = new Date(2023, 3 + (i % 3), 1 + i * 2)
    await prisma.booking.create({
      data: {
        checkIn: bookingDate,
        checkOut: new Date(bookingDate.getTime() + 1000 * 60 * 60 * 24),
        userId: (i % 2) + 1,
        placeId: (i % 3) + 1,
      },
    })
  }
}

main()
  .then(async () => {
    console.log('Seed complete')
    await prisma.$disconnect()
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
