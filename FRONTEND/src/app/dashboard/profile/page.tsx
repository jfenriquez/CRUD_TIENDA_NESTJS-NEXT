import React from "react";
import Location from "../../../components/Location";
import Image from "next/image";
const Profile = () => {
  return (
    <div className="hero min-h-screen bg-base-100 max-w-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold">PERFIL</h1>

          {/* LOCATION */}
          <Location />

          <div className="flex flex-col w-full">
            <div className="divider divider-neutral">Ordenes</div>
          </div>
          {/* ORDER */}
          <br></br>
          <div className="flex flex-wrap justify-center mt-auto">
            <div className="stats shadow m-2">
              <div className="stat">
                <div className="stat-title">Total Page Views</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
            <div className="stats shadow m-2">
              <div className="stat">
                <Image
                  width={150}
                  height={150}
                  src="/location.png"
                  alt="Shoes"
                ></Image>
                <div className="stat-title">Total Page Views</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>

            <div className="stats shadow m-2">
              <div className="stat">
                <div className="stat-title">Total Page Views</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>

            <div className="stats shadow m-2">
              <div className="stat">
                <div className="stat-title">Total Page Views</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>

            <div className="stats shadow m-2">
              <div className="stat">
                <div className="stat-title">Total Page Views</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1>LFT</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
