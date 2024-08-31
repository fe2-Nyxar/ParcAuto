<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ImportTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        $user = auth()->user();

        return $user->hasVerifiedEmail() && auth()->user()->isboss === 1;
    }

    /**
         * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tableToImport' => "required|in:user,car,inspection,maintenance,fuel,carAssignment,accident",
        ];
    }
}
