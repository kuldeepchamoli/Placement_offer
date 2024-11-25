package com.iiitb.backend.Repository;
import com.iiitb.backend.Model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository  extends JpaRepository<Organization, Integer> {

}
