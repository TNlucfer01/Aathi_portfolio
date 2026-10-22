// Real screenshots / figures from the repos (the only ones that exist).
import htshare from "../assets/shots/htshare.webp";
import plant from "../assets/shots/plant-training.webp";

export const shots = {
  htshare: {
    src: htshare,
    alt: "HtShare desktop window showing server controls, request statistics and a QR code for connecting a phone",
    caption: "HtShare's main window — start/stop server, live stats, QR code for phone pairing.",
  },
  plant: {
    src: plant,
    alt: "Two line charts of training and validation loss and accuracy over 20 epochs, with validation accuracy reaching about 93 percent",
    caption: "Training vs validation loss and accuracy from the committed run — about 93% validation accuracy after 20 epochs.",
  },
};
