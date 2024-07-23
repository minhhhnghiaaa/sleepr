import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  /**
   * Creates a new reservation using the provided `createReservationDto` and `user`.
   *
   * @param {CreateReservationDto} createReservationDto - The data for the new reservation.
   * @param {UserDto} user - The user creating the reservation.
   * @return {Promise<UserDto>} A Promise that resolves to the newly created user.
   */
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    const _user = this.reservationsService.create(createReservationDto, user);
    console.log(user);

    return _user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  /**
   * Asynchronously retrieves all reservations using the `reservationsService` and returns the result.
   *
   * @return {Promise<any>} A promise that resolves to an array of reservation objects.
   */
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  /**
   * Finds a reservation by its ID.
   *
   * @param {string} id - The ID of the reservation.
   * @return {Promise<Reservation>} A promise that resolves to the reservation object.
   */
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  /**
   * A description of the entire function.
   *
   * @param {string} id - The ID of the reservation to update.
   * @param {UpdateReservationDto} updateReservationDto - The data to update the reservation.
   * @return {Promise<any>} A promise that resolves to the updated reservation.
   */
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  /**
   * A description of the entire function.
   *
   * @param {string} id - The ID of the reservation to remove.
   * @return {Promise<any>} A promise that resolves to the removed reservation.
   */
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
