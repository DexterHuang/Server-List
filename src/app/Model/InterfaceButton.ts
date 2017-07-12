export class InterfaceButton {
    text: string;
    onClick: Function;
    color = 'primary';
    constructor(text: string, onClick?: Function) {
        this.text = text;
        this.onClick = onClick;
    }
    onButtonClick() {
        if (this.onClick) {
            this.onClick();
        }
    }
}
