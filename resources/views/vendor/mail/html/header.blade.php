@props(['url'])
<tr>
<td class="header" style="text-align: center;">
<a href="{{ $url }}" style="display: inline-block; text-decoration: none;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
        <tr>
            <td style="vertical-align: middle; padding-right: 12px;">
                <div style="height: 40px; width: 40px; background-color: #020617; border-radius: 8px; text-align: center;">
                    <img src="{{ asset('logo.png') }}?v=1.3" alt="{{ config('app.name') }}" height="28" style="height: 28px; width: auto; margin-top: 6px; display: inline-block;">
                </div>
            </td>
            <td style="vertical-align: middle;">
                <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #3d4852; line-height: 1;">
                    {{ config('app.name') }}
                </span>
            </td>
        </tr>
    </table>
</a>
</td>
</tr>
