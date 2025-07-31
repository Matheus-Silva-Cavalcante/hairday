import { schedulesDay } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll(".period");

// Gera evento click para cada lista (manhã, tarde e noite).
periods.forEach((period) => {
    // captura o evento de clique na lista.
    period.addEventListener("click", async (event) => {
        if (event.target.classList.contains("cancel-icon")) {
            const item = event.target.closest("li");

            // pega o id do agendamento para remover.
            const {id} = item.dataset;

            if (id) {
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?");

                if (isConfirm) {
                    await scheduleCancel({id});
                    schedulesDay();
                }
            }
        }
    });
}); 