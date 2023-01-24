import Swal from 'sweetalert2';

const SweetalertHelper = {
  init({ icon, message }) {
    let timerInterval;
    Swal.fire({
      html: message,
      icon,
      timer: 1000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  },
};

export default SweetalertHelper;
