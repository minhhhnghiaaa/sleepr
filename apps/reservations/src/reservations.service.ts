import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  /**
   * Creates a new reservation using the provided `createReservationDto` and `userId`.
   *
   * @param {CreateReservationDto} createReservationDto - The data for the new reservation.
   * @param {string} userId - The ID of the user creating the reservation.
   * @return {Promise<Reservation>} A Promise that resolves to the newly created reservation.
   */
  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
