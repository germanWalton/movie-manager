/** @format */

import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema(
  {
    title: { type: String },
    episode_id: { type: Number },
    opening_crawl: { type: String },
    director: { type: String },
    producer: { type: String },
    release_date: { type: String },
    characters: { type: [String] },
    planets: { type: [String] },
    starships: { type: [String] },
    vehicles: { type: [String] },
    species: { type: [String] },
    url: { type: String },
    created: { type: String, default: () => new Date().toISOString() },
    edited: {
      type: String,
      default: () => new Date().toISOString(),
      set: () => new Date().toISOString(),
    },
  },
  { collection: 'movie' },
);

MovieSchema.pre('save', function (next) {
  this.edited = new Date().toISOString();
  next();
});

MovieSchema.pre('findOneAndUpdate', function (next) {
  this.updateOne({}, { $set: { edited: () => new Date().toISOString() } });
  next();
});
