import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlacementRequestForm.css";
import Form from 'react-bootstrap/Form';
import Select from "react-select";
import { Navbar } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
export default function PlacementRequestForm() {
  const [organization, setOrganization] = useState("");
  const [profile, setProfile] = useState("");
  const [description, setDescription] = useState("");
  const [intake, setIntake] = useState("");
  const [minimumGrade, setMinimumGrade] = useState("");
  const [specializationIds, setSpecializationIds] = useState([]);
  const [domainIds, setDomainIds] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [domains, setDomains] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isResponseVisible, setIsResponseVisible] = useState(false);

  const handleResponseMessage = (message) => {
    {
      isResponseVisible && <p>{responseMessage}</p>;
    }

    // Hide the message after 5 seconds
    setTimeout(() => {
      setIsResponseVisible(false);
    }, 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You are not authenticated.");
      return;
    }

    axios
      .get("http://localhost:8080/api/specialization", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const options = response.data.map((spec) => ({
          value: spec.specialization_id,
          label: `${spec.code} - ${spec.name}`,
        }));
        setSpecializations(options);
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });

    axios
      .get("http://localhost:8080/api/domain", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const options = response.data.map((domain) => ({
          value: domain.domain_id,
          label: `${domain.program} - ${domain.batch}`,
        }));
        setDomains(options);
      })
      .catch((error) => {
        console.error("Error fetching domains:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You are not authenticated.");
      return;
    }

    if (!organization || !profile || !description) {
      setResponseMessage("Please fill out all required fields");
      return;
    }

    const placementRequest = {
      organization,
      profile,
      description,
      intake: parseInt(intake),
      minimumGrade: parseFloat(minimumGrade),
      specialization_id: specializationIds.map((id) => parseInt(id.value)),
      domain_id: domainIds.map((id) => parseInt(id.value)),
    };

    axios
      .post("http://localhost:8080/submit", placementRequest, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setResponseMessage(<Alert variant="success">Placement request submitted successfully!</Alert>
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 401) {
          localStorage.removeItem("token"); // Remove token from storage
          window.location.href = "/login"; // Redirect to the login page
        }
        console.error("Error submitting placement request:", error);
        setResponseMessage(<Alert variant="success">Failed to submit placement request.</Alert>);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
    <Navbar>
      <div className="d-flex justify-content-center">
      <Button variant="primary" size="lg" onClick={handleLogout}>
      Logout
      </Button>
    </div>  
      </Navbar>
    <div className="container">
      
      {responseMessage && <p>{responseMessage}</p>}

      <h1 className="formheading">Submit Placement Request</h1>
      
      <form onSubmit={handleSubmit}>
        <label className="labels" htmlFor="organization">
          Organization:
        </label>
        <br />
        <input
          type="text"
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          style={{ width: "490px" }}
        />
        <br /><br />

        <label className="labels" htmlFor="profile">
          Profile:
        </label><br />
        <input
          type="text"
          id="profile"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          style={{ width: "490px" }}
        />
        <br /><br />

        <label className="labels" htmlFor="description">
          Description:
        </label><br />
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "490px" }}
        />
        <br /><br />

        <label className="labels" htmlFor="intake">
          Intake:
        </label><br />
        <input
          type="text"
          id="intake"
          value={intake}
          style={{ width: "490px" }}
          onChange={(e) => setIntake(e.target.value)}
          onBlur={() => {
            if (isNaN(intake)) {
              setIntake("");
            }
            
          }
        }
        />
        <br /><br />

        <label className="labels" htmlFor="minimumGrade">
          Minimum Grade:
        </label><br />
        <input
          type="text"
          id="minimumGrade"
          value={minimumGrade}
          style={{ width: "490px" }}
          onChange={(e) => setMinimumGrade(e.target.value)}
        />
        <br /><br />

        <label className="labels" htmlFor="specialization_ids">
          Specializations:
        </label>
        <Select
          className="select"
          id="specialization_ids"
          style={{ width: "490px" }}
          isMulti
          options={specializations}
          value={specializationIds}
          onChange={setSpecializationIds}
          styles={{
            control: (styles) => ({ ...styles, backgroundColor: "white" }),
          }}
        />
        <br />

        <label className="labels" htmlFor="domain_ids">
          Domains:
        </label>
        <Select
          className="select"
          id="domain_ids"
          isMulti
          options={domains}
          value={domainIds}
          onChange={setDomainIds}
          styles={{
            control: (styles) => ({ ...styles, backgroundColor: "white" }),
          }}
        />
        <br />

        <div className="d-flex justify-content-center">
      <Button variant="primary" size="lg" onClick={handleSubmit}>
        Submit
      </Button>
    </div>      </form>
    </div>
    </>
  );
}