## Overview

The `Dialog` class is a customizable, reusable dialog component for displaying modal dialog boxes with options for confirming or canceling actions. It includes features such as custom titles, messages, icons, buttons, auto-close functionality, and animations. Additionally, the dialog supports styling options, including background color, text color, button colors, and font family.

## Features

- **Customizable dialog content**: Allows you to set the title, message, and buttons' text.
- **Icon support**: You can display an optional icon in the dialog.
- **Button styles**: Customize button colors for the confirm and cancel actions.
- **Auto-close**: Set an auto-close duration for the dialog box.
- **Animations**: Configure animations for dialog appearance and exit effects.
- **Temporary message**: Display a temporary message (e.g., "Confirmed!" or "Canceled!") after button actions.
- **Custom callback functions**: Pass custom functions to be called when the user confirms or cancels the dialog.

## Constructor

The `Dialog` constructor accepts an object with the following options:

| Parameter             | Type            | Default Value                  | Description |
|-----------------------|-----------------|---------------------------------|-------------|
| `title`               | `string`        | `"Title"`                       | The title displayed in the dialog. |
| `message`             | `string`        | `"This is a message"`           | The message displayed in the dialog. |
| `confirmText`         | `string`        | `"Confirm"`                     | Text for the confirm button. |
| `cancelText`          | `string`        | `"Cancel"`                      | Text for the cancel button. |
| `icon`                | `string` (URL)  | `null`                          | The URL of the icon to display in the dialog (optional). |
| `width`               | `string`        | `"300px"`                       | The width of the dialog. |
| `onConfirm`           | `function`      | `null`                          | Callback function for the confirm button (optional). |
| `onCancel`            | `function`      | `null`                          | Callback function for the cancel button (optional). |
| `autoCloseDuration`   | `number`        | `null`                          | Duration (in milliseconds) after which the dialog auto-closes. |
| `backgroundColor`     | `string`        | `"#ffffff"`                     | Background color of the dialog. |
| `textColor`           | `string`        | `"#333333"`                     | Text color in the dialog. |
| `buttonStyles`        | `object`        | `{ confirmColor: "#4CAF50", cancelColor: "#f44336" }` | Object to customize button colors for confirm and cancel buttons. |
| `fontFamily`          | `string`        | `"Arial, sans-serif"`           | Font family for the dialog text. |
| `animations`          | `object`        | `{ enter: "scale(1)", exit: "scale(0.8)" }` | Animation styles for dialog enter and exit transitions. |

## Methods

### `createDialog()`

This method creates and renders the dialog box in the DOM. It uses the provided properties to configure the dialog appearance, buttons, and functionality.

### `addStyles()`

This method injects the necessary CSS styles into the page, ensuring the dialog appears correctly. It applies transitions and animations, along with the dialog's layout styles.

### `customOnConfirm()`

This is a custom callback for when the user clicks the "Confirm" button. By default, it will show a temporary message with the text `"Confirmed!"`.

### `customOnCancel()`

This is a custom callback for when the user clicks the "Cancel" button. By default, it will show a temporary message with the text `"Canceled!"`.

### `showTemporaryMessage(message, duration)`

This method displays a temporary message (e.g., "Confirmed!" or "Canceled!") on the screen for a specified duration (in seconds). The message is displayed in a floating box at the top of the screen.

### `closeDialog()`

This method closes and removes the dialog from the DOM.

## Example Usage

### Basic Dialog Example

```javascript
const dialog = new Dialog({
    title: "Are you sure?",
    message: "This action cannot be undone.",
    confirmText: "Yes",
    cancelText: "No",
    onConfirm: () => {
        console.log("Action confirmed!");
    },
    onCancel: () => {
        console.log("Action canceled!");
    }
});
```

### Dialog with Icon and Custom Styling

```javascript
const dialog = new Dialog({
    title: "Warning",
    message: "Are you sure you want to delete this file?",
    confirmText: "Delete",
    cancelText: "Cancel",
    icon: "https://example.com/warning-icon.png",
    backgroundColor: "#f8d7da",
    textColor: "#721c24",
    buttonStyles: {
        confirmColor: "#d9534f",
        cancelColor: "#5bc0de"
    },
    onConfirm: () => {
        console.log("File deleted.");
    },
    onCancel: () => {
        console.log("File not deleted.");
    }
});
```

### Dialog with Auto-Close and Custom Animations

```javascript
const dialog = new Dialog({
    title: "Success",
    message: "Your changes have been saved.",
    confirmText: "OK",
    autoCloseDuration: 3000, // Dialog will close after 3 seconds
    animations: {
        enter: "scale(1.2)",
        exit: "scale(0.5)"
    },
    onConfirm: () => {
        console.log("Changes confirmed.");
    }
});
```

### Showing Temporary Message

```javascript
const dialog = new Dialog({
    title: "Action Complete",
    message: "Your task has been successfully completed.",
    confirmText: "OK",
    onConfirm: () => {
        dialog.showTemporaryMessage("Confirmed!", 3); // Temporary message shown for 3 seconds
    }
});
```

### Using the `customOnConfirm()` and `customOnCancel()` Methods

```javascript
const dialog = new Dialog({
    title: "Delete Account",
    message: "Are you sure you want to delete your account?",
    confirmText: "Delete",
    cancelText: "Cancel",
    onConfirm: dialog.customOnConfirm,  // Custom callback
    onCancel: dialog.customOnCancel   // Custom callback
});
```

## Customizing Dialog Behavior

You can customize the behavior of the dialog by modifying the properties in the constructor, such as changing the button colors, adding custom animations, or setting the duration for auto-close.

To change the default confirm and cancel actions, you can provide your own callback functions as demonstrated in the examples.
