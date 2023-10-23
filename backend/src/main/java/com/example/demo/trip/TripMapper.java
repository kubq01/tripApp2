package com.example.demo.trip;

import com.example.demo.user.UserSimplifiedMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TripMapper {

    TripMapper INSTANCE = Mappers.getMapper(TripMapper.class);
    public Trip tripEntityToTrip(TripEntity tripEntity);
}
