package com.iiitb.backend.Repository;

import com.iiitb.backend.Model.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRepository extends JpaRepository<Domain, Integer> {
}
