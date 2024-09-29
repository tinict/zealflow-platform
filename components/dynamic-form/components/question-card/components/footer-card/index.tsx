import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFooterCard } from "./interfaces";
import { faClipboardList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";

export const FooterCard = ({
    ...props
}: IFooterCard) => {
    const { explain, onchangeExplain, removeQuestion } = props;

    return (
        <div className="flex items-center justify-between">
            <div>
                <button className="mr-2 space-x-2 flex items-center">
                    <FontAwesomeIcon
                        className="text-gray-500 text-xl"
                        icon={faClipboardList}
                    />
                    <div
                        key={"underlined"}
                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
                    >
                        <Input
                            className="w-full"
                            label="Explain"
                            type="text"
                            value={explain}
                            variant={"underlined"}
                            onChange={onchangeExplain}
                        />
                    </div>
                </button>
            </div>
            <div className="flex space-x-2">
                <button className="mr-2">
                    <FontAwesomeIcon
                        className="text-gray-500 text-xl"
                        icon={faTrash}
                        onClick={removeQuestion}
                    />
                </button>
            </div>
        </div>
    );
};