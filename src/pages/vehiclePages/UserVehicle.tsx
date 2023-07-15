import { useEffect } from "react";
import { getVehicleByUserId } from "../../service/vehicleAPI";
import { getUserProfile } from '../../service/userAPI';

function UserVehicle() {
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Check if the access token exists
      if (accessToken) {
        try {
          const response = await getUserProfile(accessToken);
          const userId = response.user._id; // Use the actual user ID from the response
          const vehicles = await getVehicleByUserId(userId);
          console.log(vehicles);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <VehicleList viewType="card"/> */}
    </>
  );
}

export default UserVehicle;
