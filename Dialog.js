class Dialog {
    constructor({
        title = "Title",
        message = "This is a message",
        confirmText = "Confirm",
        cancelText = "Cancel",
        icon = null,
        width = "300px",
        onConfirm = null,
        onCancel = null,
        autoCloseDuration = null,
        backgroundColor = "#ffffff",
        textColor = "#333333",
        buttonStyles = { confirmColor: "#4CAF50", cancelColor: "#f44336" },
        fontFamily = "Arial, sans-serif", // Font style
        animations = { enter: "scale(1)", exit: "scale(0.8)" }
    } = {}) {
        this.title = title;
        this.message = message;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
        this.icon = icon;
        this.width = width;
        this.onConfirm = onConfirm;
        this.onCancel = onCancel;
        this.autoCloseDuration = autoCloseDuration;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
        this.buttonStyles = buttonStyles;
        this.fontFamily = fontFamily;
        this.animations = animations;
        this.createDialog();
    }

    createDialog() {
        const dialogContainer = document.createElement("div");
        dialogContainer.classList.add("dialog-container");

        const dialogContent = document.createElement("div");
        dialogContent.classList.add("dialog-content");
        dialogContent.style.width = this.width;
        dialogContent.style.backgroundColor = this.backgroundColor;
        dialogContent.style.color = this.textColor;
        dialogContent.style.fontFamily = this.fontFamily;

        if (this.icon) {
            const iconElement = document.createElement("div");
            iconElement.classList.add("dialog-icon");
            iconElement.innerHTML = `<img src="${this.icon}" alt="icon" />`;
            dialogContent.appendChild(iconElement);
        }

        const titleElement = document.createElement("h2");
        titleElement.textContent = this.title;
        dialogContent.appendChild(titleElement);

        const messageElement = document.createElement("p");
        messageElement.textContent = this.message;
        dialogContent.appendChild(messageElement);

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("dialog-buttons");

        const confirmButton = document.createElement("button");
        confirmButton.textContent = this.confirmText;
        confirmButton.classList.add("dialog-confirm");
        confirmButton.style.backgroundColor = this.buttonStyles.confirmColor;
        confirmButton.onclick = () => {
            if (this.onConfirm) this.onConfirm();
            this.closeDialog();
        };

        const cancelButton = document.createElement("button");
        cancelButton.textContent = this.cancelText;
        cancelButton.classList.add("dialog-cancel");
        cancelButton.style.backgroundColor = this.buttonStyles.cancelColor;
        cancelButton.onclick = () => {
            if (this.onCancel) this.onCancel();
            this.closeDialog();
        };

        buttonsContainer.appendChild(confirmButton);
        buttonsContainer.appendChild(cancelButton);
        dialogContent.appendChild(buttonsContainer);

        dialogContainer.appendChild(dialogContent);
        document.body.appendChild(dialogContainer);

        this.addStyles();
        setTimeout(() => dialogContainer.classList.add("visible"), 10);
        this.dialogContainer = dialogContainer;

        if (this.autoCloseDuration) {
            setTimeout(() => this.closeDialog(), this.autoCloseDuration);
        }
    }

    addStyles() {
        const style = document.createElement("style");
        style.textContent = `
          .dialog-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
          }
          .dialog-container.visible {
            opacity: 1;
          }
          .dialog-content {
            padding: 20px;
            border-radius: 8px;
            max-width: 90%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
            transform: ${this.animations.exit};
            transition: transform 0.3s ease;
          }
          .dialog-container.visible .dialog-content {
            transform: ${this.animations.enter};
          }
          .dialog-icon {
            text-align: center;
            margin-bottom: 10px;
          }
          .dialog-icon img {
            width: 40px;
            height: 40px;
          }
          .dialog-content h2 {
            margin: 0 0 10px;
            font-size: 1.5em;
          }
          .dialog-content p {
            font-size: 1em;
            margin: 0 0 20px;
          }
          .dialog-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
          }
          .dialog-confirm, .dialog-cancel {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1em;
            color: white;
          }
        `;
        document.head.appendChild(style);
    }

    customOnConfirm() {
        this.showTemporaryMessage("Confirmed!",3);
    }

    customOnCancel() {
        this.showTemporaryMessage("Canceled!",3);
    }

    showTemporaryMessage(message, duration = 5) {
        const tempDialog = document.createElement("div");
        tempDialog.classList.add("temporary-message");
        tempDialog.textContent = message;
        document.body.appendChild(tempDialog);
        const style = document.createElement("style");
        style.textContent = `

        .temporary-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1100;
        }
        
        .temporary-message.visible {
            opacity: 1;
        }
        
        .temporary-message-content {
            padding: 20px;
            border-radius: 8px;
            max-width: 90%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 1.2em;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .temporary-message.visible .temporary-message-content {
            transform: scale(1);
        }
        
        @keyframes fadeInOut {
            0% {
                opacity: 0;
            }
        
            10% {
                opacity: 1;
            }
        
            90% {
                opacity: 1;
            }
        
            100% {
                opacity: 0;
            }
        }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            if (tempDialog) document.body.removeChild(tempDialog);
        }, duration * 1000);
    }

    closeDialog() {
        if (this.dialogContainer) {
            document.body.removeChild(this.dialogContainer);
            this.dialogContainer = null;
        }
    }
}
