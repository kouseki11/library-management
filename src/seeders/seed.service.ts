import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seedBooks() {
    const booksData = [
      {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
      },
      {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1,
      },
      {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1,
      },
      {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1,
      },
      {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1,
      },
    ];

    try {
      const createdBooks = await Promise.all(
        booksData.map(bookData =>
          this.prisma.book.create({ data: bookData })
        )
      );
      return createdBooks;
    } catch (error) {
      console.error('Error seeding books:', error);
      throw error;
    }
  }

  async seedMembers() {
    const membersData = [
      {
        code: "M001",
        name: "Angga",
      },
      {
        code: "M002",
        name: "Ferry",
      },
      {
        code: "M003",
        name: "Putri",
      },
    ];

    try {
      const createdMembers = await Promise.all(
        membersData.map(memberData =>
          this.prisma.member.create({ data: memberData })
        )
      );
      return createdMembers;
    } catch (error) {
      console.error('Error seeding members:', error);
      throw error;
    }
  }
}
