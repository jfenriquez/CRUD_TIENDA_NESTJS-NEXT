import React from "react";
import Image from "next/image";
const Location = () => {
  return (
    <>
      <br />
      <h1 className="text-5xl font-bold">Location:</h1>

      <div className="flex flex-col h-full w-full lg:flex-row">
        <div className="grid flex-grow h-auto card bg-base-300 rounded-box place-items-center">
          <div className="card shrink-0 w-full max-w-xl shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control join join-vertical lg:join-horizontal">
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Departamento
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Localidad
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Barrio</span>
                </label>
                <input
                  type="Barrio"
                  placeholder="Barrio"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* calle */}
              <div className="form-control join join-vertical lg:join-horizontal items-baseline">
                <select className="select select-bordered   max-w-[40%]">
                  <option disabled selected>
                    Tipo Calle
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>

                <input
                  type="Calle"
                  placeholder="Calle"
                  className="input input-bordered  max-w-[25%]"
                  required
                />
                <label className="items-baseline">#</label>
                <input
                  type="Numero"
                  placeholder="Numero"
                  className="input input-bordered max-w-[20%] "
                  required
                />
                <label className="items-baseline">-</label>
                <input
                  type="Numero"
                  placeholder="Numero"
                  className="input input-bordered max-w-[20%]"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Teléfono de contacto</span>
                </label>
                <input
                  type="text"
                  placeholder="Telefono"
                  className="input input-bordered"
                  required
                />
              </div>
              <label className="label">
                <span className="label-text">
                  Referencias adicionales de esta dirección
                </span>
              </label>

              <textarea
                className="textarea textarea-info"
                placeholder="Descripción de la fachada,localizacion en google maps etc."
              ></textarea>
            </form>
          </div>
        </div>
        {/* divider  */}
        <div className="divider lg:divider-horizontal "></div>
        <div className="grid flex-grow h-auto card bg-base-300 rounded-box place-items-center">
          <h1 className="card-title">direcciones</h1>
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <Image
                width={300}
                height={100}
                src="/location.png"
                alt="Shoes"
              ></Image>
            </figure>
            <div className="card-body">
              <h2 className="card-title">CLL 53 DN FFS</h2>
              <p>BOGOTA DC - USME</p>
              <p>john fredy enriquez muñoz</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">EDITAR</button>
                <button className="btn btn-error">ELIMINAR</button>
              </div>
            </div>
          </div>
          <br />
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <br />
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
