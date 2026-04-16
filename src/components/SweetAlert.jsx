import Swal from "sweetalert2";
import ReactDOM from "react-dom/client";
import Button from "./Button"; // Import your custom Button component

// Success alert with custom Button component
export const showSuccess = (msg, onConfirm) => {
  Swal.fire({
    title: "Success!",
    text: msg,
    icon: "success",
    showConfirmButton: false,
    showCancelButton: false,
    didOpen: () => {
      const popup = Swal.getPopup();
      if (popup) {
        // Create container for custom button
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex justify-center mt-4";
        
        // Render your custom Button component
        const root = ReactDOM.createRoot(buttonContainer);
        root.render(
          <Button
            text="OK"
            onClick={() => {
              Swal.close();
              if (onConfirm) onConfirm();
            }}
            variant="primary"
          />
        );
        
        popup.appendChild(buttonContainer);
      }
    }
  });
};

// Error alert with custom Button component
export const showError = (msg, onConfirm) => {
  Swal.fire({
    title: "Error!",
    text: msg,
    icon: "error",
    showConfirmButton: false,
    showCancelButton: false,
    didOpen: () => {
      const popup = Swal.getPopup();
      if (popup) {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex justify-center mt-4";
        
        const root = ReactDOM.createRoot(buttonContainer);
        root.render(
          <Button
            text="OK"
            onClick={() => {
              Swal.close();
              if (onConfirm) onConfirm();
            }}
            variant="primary"
          />
        );
        
        popup.appendChild(buttonContainer);
      }
    }
  });
};

// Warning alert with custom Button component
export const showWarning = (msg, onConfirm) => {
  Swal.fire({
    title: "Warning!",
    text: msg,
    icon: "warning",
    showConfirmButton: false,
    showCancelButton: false,
    didOpen: () => {
      const popup = Swal.getPopup();
      if (popup) {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex justify-center mt-4";
        
        const root = ReactDOM.createRoot(buttonContainer);
        root.render(
          <Button
            text="OK"
            onClick={() => {
              Swal.close();
              if (onConfirm) onConfirm();
            }}
            variant="primary"
          />
        );
        
        popup.appendChild(buttonContainer);
      }
    }
  });
};

// Confirmation dialog with Yes/No buttons using custom Button component
export const showConfirm = async (msg) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Are you sure?",
      text: msg,
      icon: "question",
      showConfirmButton: false,
      showCancelButton: false,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          const buttonContainer = document.createElement("div");
          buttonContainer.className = "flex gap-3 justify-center mt-4";
          
          const root = ReactDOM.createRoot(buttonContainer);
          root.render(
            <>
              <Button
                text="Yes"
                onClick={() => {
                  Swal.close();
                  resolve(true);
                }}
                variant="primary"
              />
              <Button
                text="No"
                onClick={() => {
                  Swal.close();
                  resolve(false);
                }}
                variant="outline"
              />
            </>
          );
          
          popup.appendChild(buttonContainer);
        }
      }
    });
  });
};

// Loading alert
export const showLoading = () => {
  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Close loading
export const closeLoading = () => {
  Swal.close();
};