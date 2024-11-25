package com.iiitb.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SpecializationResponse (
        @JsonProperty("specialization_id")
        Integer specializationId,

        @JsonProperty("code")
        String code,

        @JsonProperty("name")
        String name
){}

