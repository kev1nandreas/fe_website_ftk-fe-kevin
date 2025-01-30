import React from "react";

const Akademik = () => {
  return (
    <section className="flex w-full justify-center py-24 p-4">
      <div id="akademik" className="flex w-[1280px] flex-col gap-y-14">
        <h1 className="w-full font-primary text-[64px] font-extrabold text-base-dark">
          Akademik.
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="flex w-full flex-col">
            <button className="group flex w-full flex-col gap-y-1 p-6 hover:bg-base-dark hover:bg-opacity-10">
              <h2 className="font-secondary text-2xl font-semibold text-base-dark group-hover:underline">
                Bank Soal
              </h2>
              <p className="text-start font-secondary text-base font-normal text-base-dark text-opacity-70">
                Nec vel senectus condimentum nec tempor amet porta. Consectetur
                tincidunt urna nulla donec est consequat blandit. Commodo dolor
                eu.
              </p>
            </button>
            <button className="group flex w-full flex-col gap-y-1 p-6 hover:bg-base-dark hover:bg-opacity-10">
              <h2 className="font-secondary text-2xl font-semibold text-base-dark group-hover:underline">
                MBKM
              </h2>
              <p className="text-start font-secondary text-base font-normal text-base-dark text-opacity-70">
                Sit blandit tincidunt diam libero amet mauris. Mollis euismod
                imperdiet fringilla ornare eu quis nunc elementum. Lacus purus
                sagittis cursus.
              </p>
            </button>
          </div>
          <div className="flex w-full flex-col">
            <button className="group flex w-full flex-col gap-y-1 p-6 hover:bg-base-dark hover:bg-opacity-10">
              <h2 className="font-secondary text-2xl font-semibold text-base-dark group-hover:underline">
                Beasiswa
              </h2>
              <p className="text-start font-secondary text-base font-normal text-base-dark text-opacity-70">
                Nunc ultricies mattis risus arcu odio elit nunc mauris et. Sed
                id proin quis augue porttitor scelerisque. Vitae aliquam
                facilisis semper tempor.
              </p>
            </button>
            <button className="group flex w-full flex-col gap-y-1 p-6 hover:bg-base-dark hover:bg-opacity-10">
              <h2 className="font-secondary text-2xl font-semibold text-base-dark group-hover:underline">
                Lomba
              </h2>
              <p className="text-start font-secondary text-base font-normal text-base-dark text-opacity-70">
                Pharetra dui et hendrerit fusce. Adipiscing maecenas rhoncus
                vitae et lectus donec. Tristique pulvinar tellus non integer id
                commodo. Eu.
              </p>      
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Akademik;
