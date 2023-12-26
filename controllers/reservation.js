import db from "../models/index.js";
const { ReservationModel, RoomsModel, RoomImagesModel , UsersModel} = db;

// Get all reservations with populated rooms
export const getAllReservations = async (req, res) => {
    try {
      const reservations = await ReservationModel.findAll({
        include: [
          {
            model: RoomsModel,
            attributes: [
              "id",
              "number",
              "quality",
              "guestNumber",
              "isBooked",
              "price",
              "description",
            ],
          },
        ],
      });
  
      const reservationsWithDays = reservations.map((reservation) => {
        const numberOfReservedDays = calculateNumberOfReservedDays(reservation.checkInDate, reservation.checkOutDate);
        return {
          reservation,
          numberOfReservedDays,
        };
      });
  
      res.status(200).json(reservationsWithDays);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get a reservation by ID with populated room
export const getReservationById = async (req, res) => {
    const id = req.body.id;
  
    try {
      const reservation = await ReservationModel.findByPk(id, {
        include: [
          {
            model: RoomsModel,
            attributes: [
              "id",
              "number",
              "quality",
              "guestNumber",
              "isBooked",
              "price",
              "description",
            ],
          },
        ],
      });
  
      if (reservation) {
        const numberOfReservedDays = calculateNumberOfReservedDays(reservation.checkInDate, reservation.checkOutDate);
  
        res.status(200).json({
          reservation,
          numberOfReservedDays,
        });
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Add a new reservation
export const addReservation = async (req, res) => {
  const { roomId, userId, checkInDate, checkOutDate } = req.body;

  try {
    // Check if the room is available for the specified date range
    const existingReservation = await ReservationModel.findOne({
      where: {
        roomId,
        [db.Sequelize.Op.or]: [
          {
            checkInDate: {
              [db.Sequelize.Op.between]: [checkInDate, checkOutDate],
            },
          },
          {
            checkOutDate: {
              [db.Sequelize.Op.between]: [checkInDate, checkOutDate],
            },
          },
        ],
      },
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'Room is already booked for the specified date range' });
    }

    // Fetch room details
    const roomDetails = await RoomsModel.findByPk(roomId);

    if (!roomDetails) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Calculate total price based on the number of reserved days and the room price
    const pricePerNight = roomDetails.price;
    const numberOfReservedDays = calculateNumberOfReservedDays(checkInDate, checkOutDate);
    const totalPrice = pricePerNight * numberOfReservedDays;

    // Create a new reservation with the calculated total price
    const newReservation = await ReservationModel.create({
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    // Update the room's "idBooked" field to true
    await roomDetails.update({ idBooked: true });

    res.status(201).json({ reservation: newReservation, totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a reservation by ID
export const updateReservation = async (req, res) => {
  const { id, roomId, userId, checkInDate, checkOutDate, totalPrice } =
    req.body;

  try {
    const [updatedRows] = await ReservationModel.update(
      {
        roomId,
        userId,
        checkInDate,
        checkOutDate,
        totalPrice,
      },
      {
        where: { id: id },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const updatedReservation = await ReservationModel.findByPk(id);
    res.status(200).json({
      msg: `Reservation ${updatedReservation.id} was updated successfully`,
      data: updatedReservation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a reservation by ID
export const deleteReservation = async (req, res) => {
  const id = req.body.id;

  try {
    const deletedRows = await ReservationModel.destroy({
      where: { id: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res
      .status(200)
      .json(`Reservation with id: ${id} has been deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to calculate the number of reserved days
const calculateNumberOfReservedDays = (checkInDate, checkOutDate) => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  return Math.round(Math.abs((endDate - startDate) / oneDayInMilliseconds));
};


// get reservation for specific user 
export const getReservationsByUserId = async (req, res) => {
  try {
    const id = req.body.id; 
    const reservations = await ReservationModel.findAll({
      where: { userId : id},
      include: [
        {
          model: RoomsModel,
          attributes: ['number', 'quality', 'guestNumber', 'price', 'description'], 
          include: [
            {
              model: RoomImagesModel,
              attributes: ['imageURL'], 
            },
          ],
        },
      ],
    });

    res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

///get reservation by roomId 
export const getReservationsByRoomId = async (req, res) => {
  try {
    const id = req.body.id; 

    const reservations = await ReservationModel.findAll({
      where: { roomId : id},
      include: [
        {
          model: RoomsModel,
          attributes: ['id' ,'number', 'quality', 'guestNumber', 'price', 'description'], 
        },
        {
          model: UsersModel,
          attributes: ['id' ,'firstName', 'lastName', 'email', 'role' ], 
        },
      ],
    });

    res.status(200).json({data : reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};