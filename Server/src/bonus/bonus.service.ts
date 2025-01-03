import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';
import { BaseService } from 'src/utils/classes/base.service';


@Injectable()
export class BonusService extends BaseService {
  searchableKeys: string[] = [];

  constructor(
    @InjectModel(Bonus.name) private bonusModel: Model<Bonus>,
    private readonly usersService: UsersService
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The bonus model.
   */
  getModuleModel() {
    return this.bonusModel;
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find()
    }
  }

  /**
   * Create a new bonus.
   * @param createBonusDto The data for the new bonus.
   * @param user The user who is creating the new bonus.
   */
  async create(createBonusDto: CreateBonusDto, user: UserDocument) {
    const existBonus = await this.bonusModel.findOne({
      $or: [
        { from: createBonusDto.from },
        { to: createBonusDto.to }
      ]
    });
    if (existBonus) throw new ConflictException('أحد أطراف الحافز مكرر');

    const inputDate: Bonus = {
      from: createBonusDto.from,
      to: (createBonusDto.to === 0)? Infinity : createBonusDto.to,
      percentage: createBonusDto.percentage,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.bonusModel.create(inputDate);
  }

  /**
   * Update Bonus.
   * @param Bonus The Bonus who is wanted to be updated.
   * @param updateBonusDto The data to update the Bonus.
   * @param user The user who is updating the Bonus.
   * @throws ConflictException if the name is already exist.
   */
  async update(bonus: BonusDocument, updateBonusDto: UpdateBonusDto, user: UserDocument) {
    const inputData: Partial<Bonus> = {
      from: updateBonusDto.from || bonus.from,
      to: (updateBonusDto.to === 0)? Infinity : (updateBonusDto.to || bonus.to),
      percentage: updateBonusDto.percentage || bonus.percentage,
      updatedBy: user._id
    }

    await bonus.set(inputData).save();
  }
}
