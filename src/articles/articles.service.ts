import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private db: DatabaseService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.db.article.create({
      data: createArticleDto,
    });
  }

  findAll(q?: string) {
    const where: Prisma.ArticleWhereInput = {};

    if (q) {
      where.OR = [
        {
          title: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            has: q,
          },
        },
      ];
    }

    return this.db.article.findMany({
      where,
    });
  }

  findOne(id: number) {
    return this.db.article.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.db.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.db.article.delete({ where: { id } });
  }
}
