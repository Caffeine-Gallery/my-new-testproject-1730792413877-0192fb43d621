import Result "mo:base/Result";
import Text "mo:base/Text";

import Float "mo:base/Float";

actor Calculator {
    stable var lastResult: Float = 0;

    public func calculate(a: Float, op: Text, b: Float): async Float {
        var result: Float = 0;

        switch (op) {
            case "+" { result := a + b; };
            case "-" { result := a - b; };
            case "*" { result := a * b; };
            case "/" {
                if (b == 0) {
                    // Handle division by zero
                    result := 0;
                } else {
                    result := a / b;
                };
            };
            case _ { result := 0; }; // Default case for unknown operations
        };

        lastResult := result;
        result
    };

    public query func getLastResult(): async Float {
        lastResult
    };
}
