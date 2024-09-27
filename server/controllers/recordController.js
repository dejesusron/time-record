import asyncHandler from 'express-async-handler';
import Record from '../models/recordModel.js';

// @desc: display all the records
// @route: GET /api/records
// @access: Private
const getRecords = asyncHandler(async (req, res) => {
  if (req.user.role === 'admin') {
    const records = await Record.find();
    res.status(200).json(records);
  } else if (req.user.role === 'user') {
    const records = await Record.find({ user: req.user.id });
    res.status(200).json(records);
  } else {
    res.status(400);
    throw new Error('Not authorized');
  }
});

// @desc: add a record
// @route: POST /api/records
// @access: Private
const addRecord = asyncHandler(async (req, res) => {
  const { timeIn, timeOut, duration } = req.body;

  // check if date exists for the user
  // const currentDay = new Date().toISOString().split('T')[0];
  // const dateExists = await Record.findOne({
  //   user: req.user.id,
  //   createdAt: {
  //     $gte: new Date(currentDay),
  //     $lt: new Date(currentDay + 'T23:59:59.999Z'),
  //   },
  // });

  // if (dateExists) {
  //   res.status(400);
  //   throw new Error('Record already exists for this date');
  // }

  const record = await Record.create({
    user: req.user.id,
    timeIn,
    timeOut,
    duration,
  });

  if (record) {
    res.status(201).json(record);
  } else {
    res.status(400);
    throw new Error('Invalid record data');
  }
});

// @desc: uodate a record
// @route: PUT /api/records/:id
// @access: Private
const updateRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);

  // check if record can be found
  if (!record) {
    res.status(400);
    throw new Error('Record not found');
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //authorize update if the user is admin or the login user matched record user
  if (req.user.role === 'admin' || record.user.toString() === req.user.id) {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedRecord);
  } else {
    res.status(401);
    throw new Error('User not authorized');
  }
});

// @desc: delete a record
// @route: GET /api/records/:id
// @access: Private
const deleteRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);

  //check if record exists
  if (!record) {
    res.status(400);
    throw new Error('Record not found');
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //authorize delete if the user is admin or the login user matched record user
  if (req.user.role === 'admin' || record.user.toString() === req.user.id) {
    await record.deleteOne();

    // const { _id, user, createdAt } = record;

    res.status(200).json(record);
  } else {
    res.status(401);
    throw new Error('User not authorized');
  }
});

export { getRecords, addRecord, updateRecord, deleteRecord };
