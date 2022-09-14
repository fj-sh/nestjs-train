import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) throw new NotFoundException();
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません。');
    }
    const updatedItem: Item = {
      ...item,
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString(),
    };
    return await this.itemRepository.updateStatus(updatedItem);
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません。');
    }
    await this.itemRepository.delete(id);
  }
}
